import json
import os
from pathlib import Path

def load_nakshatra_data():
    """Load nakshatra configuration data from JSON file"""
    with open('nakshatra_data.json', 'r', encoding='utf-8') as f:
        return json.load(f)

def load_template():
    """Load the Rohini template file"""
    with open('../rohini.html', 'r', encoding='utf-8') as f:
        return f.read()

def replace_colors(template, colors):
    """Replace color variables and themes in CSS"""
    name = colors['name'].lower()
    
    # Replace CSS variable names
    for old_prefix in ['--rohini-', 'var(--rohini-']:
        template = template.replace(old_prefix, f'--{name}-')
        
    # Replace direct color values
    color_literals = {
        '#2ecc71': colors['accent_color'],
        '#27ae60': colors['accent_color'],
        '#4ecdc4': colors['accent_color']
    }
    for old_color, new_color in color_literals.items():
        template = template.replace(old_color, new_color)
        
    # Replace theme class names
    template = template.replace('theme-rohini', f'theme-{name}')
    template = template.replace('responsive-rohini', f'responsive-{name}')
    
    # Replace color variables
    color_vars = {
        '--rohini-primary': colors['primary_gradient'],
        '--rohini-secondary': colors['secondary_color'],
        '--rohini-glow': colors['glow_color'],
        '--rohini-accent': colors['accent_color']
    }
    for old_var, new_color in color_vars.items():
        template = template.replace(old_var, f'--{name}-{old_var.split("-")[-1]}')
        
    return template

def replace_content(template, nakshatra):
    """Replace nakshatra-specific content"""
    replacements = {
        'Rohini': nakshatra['name'],
        'The Red One': nakshatra['translation'],
        '🌱': nakshatra['symbol'],
        'Growth Master • Nature\'s Nurturer • Abundance Creator': nakshatra['tagline'],
        'Previous: Krittika': f'Previous: {nakshatra["previous"]}',
        'Next: Mrigashira': f'Next: {nakshatra["next"]}',
        'krittika.html': f'{nakshatra["previous"].lower().replace(" ", "-")}.html',
        'mrigashira.html': f'{nakshatra["next"].lower().replace(" ", "-")}.html'
    }
    
    # Replace section subtitles
    replacements.update({
        'Rohini\'s nurturing energy': f'{nakshatra["name"]}\'s energy',
        'Rohini\'s wisdom': f'{nakshatra["name"]}\'s wisdom',
        'Essence of Rohini': f'Essence of {nakshatra["name"]}'
    })
    
    for old_text, new_text in replacements.items():
        template = template.replace(old_text, new_text)
    
    # Replace mythology content
    template = replace_section_content(template, 
        'Mythological Foundation',
        nakshatra['mythology']
    )
    
    # Replace core qualities
    template = replace_section_content(template,
        'Core Qualities',
        nakshatra['qualities']
    )
    
    # Replace essence section
    template = replace_section_content(template,
        'The Essence of Rohini',
        nakshatra['essence']
    )
    
    # Replace related nakshatras section
    template = replace_section_content(template,
        'Explore Related Nakshatras',
        nakshatra['related_nakshatras']
    )
    
    return template

def generate_mythology_html(mythology_data):
    """Generate HTML for mythology section from JSON data"""
    html = ''
    for section in mythology_data.values():
        html += f'''
            <div class="content-card expandable-card" onclick="toggleExpandableCard(this)">
                <div class="card-header-expand">
                    <div class="card-icon">{section['symbol']}</div>
                    <span class="expand-arrow">▼</span>
                </div>
                <h3 class="card-title">{section['title']}</h3>
                <div class="basic-content">
                    {section['content']}
                </div>
                <div class="detailed-content">
                    {''.join([f'<div class="detail-item">{detail}</div>' for detail in section['details']])}
                </div>
            </div>
        '''
    return html

def generate_qualities_html(qualities_data):
    """Generate HTML for qualities section from JSON data"""
    html = '<div class="qualities-grid">'
    for quality in qualities_data:
        html += f'''
            <div class="quality-item" onclick="toggleQuality(this)">
                <div class="quality-tag">
                    <span>{quality['title']}</span>
                    <span class="quality-arrow">▼</span>
                </div>
                <div class="quality-details">
                    <p>{quality['description']}</p>
                </div>
            </div>
        '''
    html += '</div>'
    return html

def generate_essence_html(essence_data):
    """Generate HTML for essence section"""
    html = f'''
        <div class="section-header">
            <h2 class="section-title">{essence_data['title']}</h2>
            <p class="section-subtitle">{essence_data['subtitle']}</p>
        </div>
        <div class="two-column-grid">
    '''
    
    for card in essence_data['cards']:
        html += f'''
            <div class="content-card">
                <div class="card-icon">{card['icon']}</div>
                <h3 class="card-title">{card['title']}</h3>
                <div class="card-content">{card['content']}</div>
            </div>
        '''
    
    html += '</div>'
    return html

def generate_related_nakshatras_html(related_data):
    """Generate HTML for related nakshatras section"""
    html = '''
        <div class="section-header">
            <h2 class="section-title">Explore Related Nakshatras</h2>
            <p class="section-subtitle">Discover complementary stellar consciousness programs</p>
        </div>
        <div class="related-grid" style="margin-top: 1.5rem;">
    '''
    
    # Previous, Next, and Complementary nakshatras
    for nakshatra_type in ['previous', 'next', 'complementary']:
        if nakshatra_type in related_data:
            n = related_data[nakshatra_type]
            html += f'''
                <a class="related-card" href="{n['name'].lower().replace(' ', '-')}.html">
                    <div style="font-size: 2rem; margin-bottom: 0.5rem;">{n['symbol']}</div>
                    <h3>{n['name']}</h3>
                    <p>{n['description']}</p>
                </a>
            '''
    
    html += '</div>'
    return html

def generate_psychology_html(psychology_data):
    """Generate HTML for psychology section from JSON data"""
    html = '<div class="two-column-grid">'
    
    # Cognitive Patterns card
    html += f'''
        <div class="content-card expandable-card" onclick="toggleExpandableCard(this)">
            <div class="card-header-expand">
                <div class="card-icon">🧠</div>
                <span class="expand-arrow">▼</span>
            </div>
            <h3 class="card-title">Cognitive Patterns</h3>
            <div class="basic-content">{psychology_data['cognitive']['summary']}</div>
            <div class="detailed-content">
                {''.join([f'<div class="detail-item"><strong>{k}:</strong> {v}</div>' for k,v in psychology_data['cognitive']['details'].items()])}
            </div>
        </div>
    '''
    
    # Emotional Landscape card
    html += f'''
        <div class="content-card expandable-card" onclick="toggleExpandableCard(this)">
            <div class="card-header-expand">
                <div class="card-icon">❤️</div>
                <span class="expand-arrow">▼</span>
            </div>
            <h3 class="card-title">Emotional Landscape</h3>
            <div class="basic-content">{psychology_data['emotional']['summary']}</div>
            <div class="detailed-content">
                {''.join([f'<div class="detail-item"><strong>{k}:</strong> {v}</div>' for k,v in psychology_data['emotional']['details'].items()])}
            </div>
        </div>
    '''
    
    html += '</div>'
    
    # Stats Grid
    html += '''
        <div class="stats-section expandable-card" onclick="toggleExpandableCard(this)" style="cursor: pointer;">
            <div class="card-header-expand" style="justify-content: center; margin-bottom: 1rem;">
                <h3 style="margin: 0;">Personality Dynamics</h3>
                <span class="expand-arrow" style="margin-left: 1rem;">▼</span>
            </div>
    '''
    
    # Add stats grid
    if 'stats' in psychology_data:
        html += '<div class="stats-grid">'
        for stat in psychology_data['stats']:
            html += f'''
                <div class="stat-item">
                    <h3>{stat['value']}%</h3>
                    <p>{stat['name']}</p>
                </div>
            '''
        html += '</div>'
    
    # Add trait categories
    if 'traits' in psychology_data:
        html += '<div class="psychology-traits">'
        for category in psychology_data['traits']:
            html += f'''
                <div class="trait-category">
                    <h3>{category['title']}</h3>
                    <ul>
                        {''.join([f'<li>{trait}</li>' for trait in category['items']])}
                    </ul>
                </div>
            '''
        html += '</div>'
    
    html += '</div>'
    return html

def replace_section_content(template, section_marker, new_content):
    """Replace content of a specific section while preserving structure"""
    # Convert content to HTML based on section type
    if section_marker == 'Mythological Foundation':
        content_html = generate_mythology_html(new_content)
    elif section_marker == 'Core Qualities':
        content_html = generate_qualities_html(new_content)
    elif section_marker == 'Psychological Architecture':
        content_html = generate_psychology_html(new_content)
    elif section_marker == 'The Essence of Rohini':
        content_html = generate_essence_html(new_content)
    elif section_marker == 'Explore Related Nakshatras':
        content_html = generate_related_nakshatras_html(new_content)
    else:
        content_html = str(new_content)
    
    start_marker = f'<h2 class="section-title">{section_marker}</h2>'
    end_marker = '</section>'
    
    start_idx = template.find(start_marker)
    if start_idx == -1:
        return template
        
    section_start = template.find('<div class="content-card">', start_idx)
    section_end = template.find(end_marker, section_start)
    
    return template[:section_start] + content_html + template[section_end:]

def generate_nakshatra_page(nakshatra_name):
    """Generate a complete nakshatra page"""
    # Load data
    nakshatras = load_nakshatra_data()
    if nakshatra_name not in nakshatras:
        raise ValueError(f"No data found for nakshatra: {nakshatra_name}")
        
    nakshatra = nakshatras[nakshatra_name]
    template = load_template()
    
    # Apply transformations
    template = replace_colors(template, nakshatra['colors'])
    template = replace_content(template, nakshatra)
    
    # Save new file
    output_path = f'../{nakshatra_name.lower().replace(" ", "-")}.html'
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(template)
    
    print(f"Generated {output_path}")

def main():
    # Create scripts directory if it doesn't exist
    Path('nakshatra_data.json').parent.mkdir(exist_ok=True)
    
    # Example usage
    if not os.path.exists('nakshatra_data.json'):
        print("Please create nakshatra_data.json with the required configuration first")
        return
        
    nakshatra_name = input("Enter nakshatra name to generate (e.g. Chitra): ")
    generate_nakshatra_page(nakshatra_name)

if __name__ == "__main__":
    main()