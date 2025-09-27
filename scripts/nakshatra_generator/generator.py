"""
NakshatraPageGenerator - Main class for generating nakshatra pages.
"""
import os
from typing import Optional
from .content import NakshatraContent
from .theme import ColorTheme, ColorPalette
from jinja2 import Environment, FileSystemLoader

class NakshatraPageGenerator:
    """Generate complete nakshatra pages from content"""
    
    def __init__(self, template_dir: str):
        self.env = Environment(
            loader=FileSystemLoader(template_dir),
            autoescape=True
        )
        self.content = None
        self.theme = None
        
    def load_content(self, content: NakshatraContent):
        """Load and validate nakshatra content"""
        content.validate_all()
        self.content = content
        
        # Generate theme based on content
        theme_type = ColorTheme.get_theme_type(content.qualities)
        self.theme = ColorTheme.get_theme(theme_type)
        
    def generate_page(self, output_dir: str) -> str:
        """Generate the complete nakshatra page"""
        if not self.content or not self.theme:
            raise ValueError("Content and theme must be loaded first")
            
        # Load template
        template = self.env.get_template('nakshatra_template.html')
        
        # Generate CSS
        css = ColorTheme.generate_css(self.content.name, self.theme)
        
        # Render template
        html = template.render(
            content=self.content,
            theme=self.theme,
            css=css
        )
        
        # Save to file
        output_path = os.path.join(
            output_dir,
            f"{self.content.name.lower()}.html"
        )
        
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(html)
            
        return output_path
        
    @staticmethod
    def create_nakshatra_page(
        content_file: str,
        template_dir: str,
        output_dir: str
    ) -> str:
        """
        Convenience method to generate a page from a content file
        
        Args:
            content_file: Path to JSON content file
            template_dir: Path to template directory
            output_dir: Where to save the generated page
            
        Returns:
            Path to generated HTML file
        """
        # Create generator
        generator = NakshatraPageGenerator(template_dir)
        
        # Load content from JSON
        content = NakshatraContent.from_json(content_file)
        generator.load_content(content)
        
        # Generate page
        return generator.generate_page(output_dir)