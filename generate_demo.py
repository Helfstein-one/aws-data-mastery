import asyncio
from playwright.async_api import async_playwright
import imageio
import os
import glob
from PIL import Image
import time

async def capture_frames():
    print("Starting Playwright to capture fluid frames...")
    frames_dir = "frames_temp"
    os.makedirs(frames_dir, exist_ok=True)
    
    # Clean previous frames
    for f in glob.glob(f"{frames_dir}/*.png"):
        os.remove(f)

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        # Ratio good for GitHub README, and high enough resolution
        page = await browser.new_page(viewport={"width": 1280, "height": 800})
        
        current_dir = os.path.abspath(os.path.dirname(__file__))
        index_url = f"file://{current_dir}/index.html"
        
        print(f"Navigating to {index_url}")
        await page.goto(index_url)
        # Wait longer to ensure all SVGs and gradients load
        await page.wait_for_timeout(3000)
        
        frame_idx = 0
        
        async def take_shot():
            nonlocal frame_idx
            filepath = f"{frames_dir}/frame_{frame_idx:04d}.png"
            await page.screenshot(path=filepath)
            frame_idx += 1
            
        # Initial wait for the dashboard to render
        await page.wait_for_timeout(1000)
        
        # Smooth scrolling loop
        # We will scroll 50 pixels at a time for a slower, smoother effect
        scroll_step = 50
        total_scrolls = 80  # 80 * 50 = 4000 pixels
        
        for i in range(total_scrolls):
            await take_shot()
            await page.evaluate(f"window.scrollBy(0, {scroll_step})")
            # Wait a tiny bit for the page to render the scroll
            await page.wait_for_timeout(100)
            
        await browser.close()
        
    print(f"Captured {frame_idx} frames.")
    return frame_idx

def create_gif():
    print("Stitching frames into a fluid GIF...")
    frames_dir = "frames_temp"
    images = []
    
    frame_files = sorted(glob.glob(f"{frames_dir}/frame_*.png"))
    
    for filename in frame_files:
        img = Image.open(filename)
        # Resize slightly to keep GIF file size manageable
        img = img.resize((int(img.width * 0.7), int(img.height * 0.7)), Image.Resampling.LANCZOS)
        images.append(img)
        
    if images:
        output_path = "aws-data-mastery-demo.gif"
        # duration = 100ms (10fps for smooth scrolling)
        images[0].save(
            output_path,
            save_all=True,
            append_images=images[1:],
            duration=100, 
            loop=0,
            optimize=False # Avoid artifacts (blinking) by not heavily optimizing colors across frames if it causes issues
        )
        print(f"GIF saved successfully to {output_path}")
    else:
        print("No frames found to create GIF.")
        
    # Clean up
    for f in frame_files:
        os.remove(f)
    os.rmdir(frames_dir)

if __name__ == "__main__":
    asyncio.run(capture_frames())
    create_gif()
