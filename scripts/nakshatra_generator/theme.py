"""
ColorTheme - Generate and manage color themes for nakshatra pages.
"""
from dataclasses import dataclass
from typing import Tuple, Dict

@dataclass
class ColorPalette:
    """Color palette for a nakshatra"""
    primary_gradient: Tuple[str, str]
    secondary_color: str
    glow_color: str
    accent_color: str
    
    def to_css_vars(self) -> Dict[str, str]:
        """Convert palette to CSS variables"""
        return {
            'primary': f'linear-gradient(135deg, {self.primary_gradient[0]}, {self.primary_gradient[1]})',
            'secondary': f'rgba({self._hex_to_rgb(self.secondary_color)}, 0.2)',
            'glow': f'rgba({self._hex_to_rgb(self.glow_color)}, 0.4)',
            'accent': self.accent_color
        }
        
    @staticmethod
    def _hex_to_rgb(hex_color: str) -> str:
        """Convert hex color to RGB values"""
        hex_color = hex_color.lstrip('#')
        rgb = tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))
        return f"{rgb[0]}, {rgb[1]}, {rgb[2]}"

class ColorTheme:
    """Generate and manage nakshatra color themes"""
    
    # Pre-defined color themes for each nakshatra type
    THEME_MAPPINGS = {
        'creative': {
            'primary': ('#fd79a8', '#fdcb6e'),  # Pink to Yellow (like Chitra)
            'secondary': '#fd79a8',
            'glow': '#fd79a8',
            'accent': '#fd79a8'
        },
        'fiery': {
            'primary': ('#ff6b6b', '#ffd93d'),  # Red to Gold
            'secondary': '#ff6b6b',
            'glow': '#ff6b6b',
            'accent': '#ff6b6b'
        },
        'mystical': {
            'primary': ('#6c5ce7', '#a29bfe'),  # Deep Purple to Light Purple
            'secondary': '#6c5ce7',
            'glow': '#6c5ce7',
            'accent': '#6c5ce7'
        },
        'earthy': {
            'primary': ('#00b894', '#55efc4'),  # Deep Green to Mint
            'secondary': '#00b894',
            'glow': '#00b894',
            'accent': '#00b894'
        },
        'airy': {
            'primary': ('#74b9ff', '#0984e3'),  # Light Blue to Deep Blue
            'secondary': '#74b9ff',
            'glow': '#74b9ff',
            'accent': '#74b9ff'
        },
        'watery': {
            'primary': ('#4ecdc4', '#45b7d1'),  # Teal to Ocean Blue
            'secondary': '#4ecdc4',
            'glow': '#4ecdc4',
            'accent': '#4ecdc4'
        }
    }
    
    @classmethod
    def get_theme(cls, nakshatra_type: str) -> ColorPalette:
        """Get color theme for a nakshatra type"""
        if nakshatra_type not in cls.THEME_MAPPINGS:
            raise ValueError(f"Unknown nakshatra type: {nakshatra_type}")
            
        theme = cls.THEME_MAPPINGS[nakshatra_type]
        return ColorPalette(
            primary_gradient=theme['primary'],
            secondary_color=theme['secondary'],
            glow_color=theme['glow'],
            accent_color=theme['accent']
        )
        
    @classmethod
    def generate_css(cls, nakshatra_name: str, palette: ColorPalette) -> str:
        """Generate CSS variables for the theme"""
        vars = palette.to_css_vars()
        css = f":root {{\n"
        for name, value in vars.items():
            css += f"    --{nakshatra_name.lower()}-{name}: {value};\n"
        css += "}\n"
        return css

    @classmethod
    def get_theme_type(cls, qualities: list) -> str:
        """Determine nakshatra type from qualities"""
        # Add logic to determine theme type based on nakshatra qualities
        # This would analyze the qualities and return the appropriate type
        # For now, return a default
        return 'creative'