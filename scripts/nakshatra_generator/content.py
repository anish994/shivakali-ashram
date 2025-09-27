"""
NakshatraContent - Content template and validation for nakshatra pages.
"""
from dataclasses import dataclass
from typing import List, Dict

@dataclass
class CoreInfo:
    """Core information about the nakshatra"""
    name: str
    translation: str
    symbol: str
    tagline: List[str]
    ruling_planet: str
    element: str
    zodiac_range: str
    archetype: str

@dataclass
class MythologySection:
    """Mythological content section"""
    title: str
    subtitle: str
    sections: List[Dict[str, any]]

@dataclass
class QualitySection:
    """Core qualities and attributes"""
    title: str
    subtitle: str
    qualities: List[Dict[str, str]]

@dataclass
class IntroSection:
    """Introduction and overview"""
    main_text: str
    essence_quote: str
    modern_context: str
    key_aspects: List[str]

class NakshatraContent:
    """Main content container and validator for nakshatra pages"""
    
    def __init__(self, name: str):
        self.name = name
        self.core_info = None
        self.intro = None
        self.mythology = None
        self.qualities = None
        self.color_theme = None
        
    def set_core_info(self, info: CoreInfo):
        """Set and validate core information"""
        self.core_info = info
        self._validate_core_info()
        
    def set_intro(self, intro: IntroSection):
        """Set introduction content"""
        self.intro = intro
        self._validate_intro()
        
    def set_mythology(self, mythology: MythologySection):
        """Set mythology section content"""
        self.mythology = mythology
        self._validate_mythology()
        
    def set_qualities(self, qualities: QualitySection):
        """Set qualities section content"""
        self.qualities = qualities
        self._validate_qualities()
        
    def _validate_core_info(self):
        """Validate core information completeness"""
        if not self.core_info:
            raise ValueError("Core info must be set")
        # Add more validation as needed
        
    def _validate_intro(self):
        """Validate introduction content"""
        if not self.intro:
            raise ValueError("Introduction must be set")
        # Add more validation as needed
        
    def _validate_mythology(self):
        """Validate mythology section content"""
        if not self.mythology:
            raise ValueError("Mythology section must be set")
        # Add more validation as needed
        
    def _validate_qualities(self):
        """Validate qualities section content"""
        if not self.qualities:
            raise ValueError("Qualities section must be set")
        # Add more validation as needed
        
    def validate_all(self):
        """Validate all content sections"""
        self._validate_core_info()
        self._validate_intro()
        self._validate_mythology()
        self._validate_qualities()
        return True