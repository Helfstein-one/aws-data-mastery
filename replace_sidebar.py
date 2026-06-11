import os
import glob
import re

with open('new_sidebar.html', 'r', encoding='utf-8') as f:
    new_sidebar = f.read()

html_files = glob.glob('*.html')
if 'new_sidebar.html' in html_files:
    html_files.remove('new_sidebar.html')

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find <nav id="sidebar"> ... </nav>
    nav_pattern = re.compile(r'<nav id="sidebar">.*?</nav>', re.DOTALL)
    
    # Customize new_sidebar for this file
    custom_sidebar = new_sidebar
    
    # We use a trick: the file name (without .html) corresponds to data-page="name"
    page_name = file.replace('.html', '')
    
    # Mark the specific link as active
    # e.g., <a href="architecture.html" class="nav-a" data-page="architecture">
    target_link = f'data-page="{page_name}"'
    if target_link in custom_sidebar:
        custom_sidebar = custom_sidebar.replace(f'class="nav-a" {target_link}', f'class="nav-a active" {target_link}')
        
        # We also need to open the parent category
        # It's <div id="cat-id" class="nav-cat-content">
        # Let's find which category this link is inside.
        parts = custom_sidebar.split('<div class="nav-lbl collapsible"')
        for i in range(1, len(parts)):
            if target_link in parts[i]:
                # Add 'active' to the label
                parts[i] = parts[i].replace('class="nav-lbl collapsible"', 'class="nav-lbl collapsible active"', 1)
                # Add 'open' to the content
                parts[i] = parts[i].replace('class="nav-cat-content"', 'class="nav-cat-content open"', 1)
                
        custom_sidebar = '<div class="nav-lbl collapsible"'.join(parts)

    new_nav = f'<nav id="sidebar">\n{custom_sidebar}\n</nav>'
    
    content = nav_pattern.sub(new_nav, content)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Sidebar replaced in all files.")
