import asyncio
from playwright.async_api import async_playwright
import os

async def capture_snapshot():
    print("Starting Playwright to capture snapshot...")
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        # Capture a nice wide landscape screenshot that shows the hero + dashboard
        page = await browser.new_page(viewport={"width": 1440, "height": 1080})
        
        current_dir = os.path.abspath(os.path.dirname(__file__))
        index_url = f"file://{current_dir}/index.html"
        
        print(f"Navigating to {index_url}")
        await page.goto(index_url)
        # Wait to ensure fonts, gradients, and SVGs are loaded
        await page.wait_for_timeout(3000)
        
        # Take a full page screenshot or just viewport. Full page might be too tall.
        # Let's just take a full page screenshot because it shows the entire map
        await page.screenshot(path="aws-data-mastery-preview.png", full_page=True)
            
        await browser.close()
        print("Snapshot saved to aws-data-mastery-preview.png")

if __name__ == "__main__":
    asyncio.run(capture_snapshot())
