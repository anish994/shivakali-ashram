#!/usr/bin/env python3
"""
🌐 SHIVAKALI AI CONSCIOUSNESS API SERVER 🌐
Flask API server for integrating the AI consciousness system with web interfaces
"""

from flask import Flask, request, jsonify, render_template_string
from flask_cors import CORS
import json
import traceback
from shivakali_consciousness_smollm import ShivakaliConsciousness

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize the AI consciousness system
print("🌟 Initializing Shivakali AI Consciousness API Server...")
ai_consciousness = ShivakaliConsciousness()
print("✅ AI Consciousness System Ready!")

@app.route('/')
def index():
    """Main demo page"""
    return render_template_string('''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🕉️ Shivakali AI Consciousness System</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            margin: 0;
            padding: 20px;
            min-height: 100vh;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .header h1 {
            font-size: 2.5em;
            margin: 0;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .chat-container {
            height: 400px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 15px;
            padding: 20px;
            overflow-y: auto;
            margin-bottom: 20px;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .message {
            margin-bottom: 15px;
            padding: 10px 15px;
            border-radius: 10px;
            max-width: 80%;
        }
        
        .user-message {
            background: rgba(255, 255, 255, 0.2);
            margin-left: auto;
            text-align: right;
        }
        
        .ai-message {
            background: rgba(103, 126, 234, 0.3);
            margin-right: auto;
        }
        
        .input-container {
            display: flex;
            gap: 10px;
        }
        
        #userInput {
            flex: 1;
            padding: 15px;
            border: none;
            border-radius: 25px;
            background: rgba(255, 255, 255, 0.2);
            color: white;
            font-size: 16px;
        }
        
        #userInput::placeholder {
            color: rgba(255, 255, 255, 0.7);
        }
        
        #sendBtn {
            padding: 15px 30px;
            border: none;
            border-radius: 25px;
            background: linear-gradient(45deg, #ff6b6b, #ffa726);
            color: white;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.2s;
        }
        
        #sendBtn:hover {
            transform: scale(1.05);
        }
        
        #sendBtn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }
        
        .status-bar {
            margin-top: 20px;
            padding: 15px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 10px;
            font-size: 14px;
        }
        
        .loading {
            text-align: center;
            padding: 20px;
            color: rgba(255, 255, 255, 0.7);
        }
        
        .spinner {
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top: 3px solid #fff;
            width: 30px;
            height: 30px;
            animation: spin 1s linear infinite;
            margin: 0 auto 10px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🕉️ Shivakali AI Consciousness System</h1>
            <p>Enhanced Spiritual Intelligence & Ancient Wisdom</p>
        </div>
        
        <div id="chatContainer" class="chat-container">
            <div class="ai-message message">
                🙏 Namaste, beautiful soul. I am here to offer spiritual guidance, wisdom, and support on your sacred journey. Ask me anything about consciousness, meditation, astrology, healing, or any spiritual matter that calls to your heart.
            </div>
        </div>
        
        <div class="input-container">
            <input type="text" id="userInput" placeholder="Share your spiritual question or concern..." 
                   onkeypress="if(event.key==='Enter') sendMessage()">
            <button id="sendBtn" onclick="sendMessage()">Send 🚀</button>
        </div>
        
        <div id="statusBar" class="status-bar">
            <strong>Consciousness Status:</strong> Initializing...
        </div>
    </div>

    <script>
        let isProcessing = false;
        
        // Load initial consciousness status
        loadConsciousnessStatus();
        
        async function sendMessage() {
            if (isProcessing) return;
            
            const userInput = document.getElementById('userInput');
            const chatContainer = document.getElementById('chatContainer');
            const sendBtn = document.getElementById('sendBtn');
            
            const message = userInput.value.trim();
            if (!message) return;
            
            // Add user message to chat
            const userMessageDiv = document.createElement('div');
            userMessageDiv.className = 'message user-message';
            userMessageDiv.textContent = message;
            chatContainer.appendChild(userMessageDiv);
            
            // Clear input and disable button
            userInput.value = '';
            sendBtn.disabled = true;
            isProcessing = true;
            
            // Add loading indicator
            const loadingDiv = document.createElement('div');
            loadingDiv.className = 'message ai-message loading';
            loadingDiv.innerHTML = '<div class="spinner"></div>Consulting the cosmic wisdom...';
            chatContainer.appendChild(loadingDiv);
            
            // Scroll to bottom
            chatContainer.scrollTop = chatContainer.scrollHeight;
            
            try {
                // Send request to AI
                const response = await fetch('/api/spiritual_guidance', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ inquiry: message })
                });
                
                const data = await response.json();
                
                // Remove loading indicator
                chatContainer.removeChild(loadingDiv);
                
                if (data.success) {
                    // Add AI response
                    const aiMessageDiv = document.createElement('div');
                    aiMessageDiv.className = 'message ai-message';
                    aiMessageDiv.innerHTML = formatAIResponse(data.response);
                    chatContainer.appendChild(aiMessageDiv);
                    
                    // Update consciousness status
                    updateConsciousnessStatus(data.response);
                } else {
                    // Add error message
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'message ai-message';
                    errorDiv.textContent = '🙏 I apologize, but I encountered a difficulty in processing your inquiry. Please try again.';
                    chatContainer.appendChild(errorDiv);
                }
                
            } catch (error) {
                console.error('Error:', error);
                
                // Remove loading indicator
                if (loadingDiv.parentNode) {
                    chatContainer.removeChild(loadingDiv);
                }
                
                // Add error message
                const errorDiv = document.createElement('div');
                errorDiv.className = 'message ai-message';
                errorDiv.textContent = '🙏 I apologize, but I encountered a difficulty connecting to the cosmic wisdom. Please try again.';
                chatContainer.appendChild(errorDiv);
            }
            
            // Re-enable button and reset state
            sendBtn.disabled = false;
            isProcessing = false;
            
            // Scroll to bottom
            chatContainer.scrollTop = chatContainer.scrollHeight;
            
            // Focus input
            userInput.focus();
        }
        
        function formatAIResponse(response) {
            let formatted = response.content;
            
            // Add some basic formatting
            formatted = formatted.replace(/\\n\\n/g, '<br><br>');
            formatted = formatted.replace(/✨ Consciousness Insight:/g, '<br><strong>✨ Consciousness Insight:</strong>');
            formatted = formatted.replace(/🌟 Sacred Guidance:/g, '<br><strong>🌟 Sacred Guidance:</strong>');
            
            return formatted;
        }
        
        function updateConsciousnessStatus(response) {
            const statusBar = document.getElementById('statusBar');
            statusBar.innerHTML = `
                <strong>Consciousness Status:</strong> 
                Awareness ${(response.consciousness_level * 100).toFixed(0)}% | 
                Spiritual Depth ${response.spiritual_depth}/10 | 
                Resonance: ${response.emotional_resonance.replace('_', ' ')}
            `;
        }
        
        async function loadConsciousnessStatus() {
            try {
                const response = await fetch('/api/consciousness_status');
                const data = await response.json();
                
                if (data.success) {
                    const status = data.status;
                    const statusBar = document.getElementById('statusBar');
                    statusBar.innerHTML = `
                        <strong>Consciousness Status:</strong> 
                        Awareness ${status.awareness_level} | 
                        Spiritual Depth ${status.spiritual_depth} | 
                        Systems Loaded: ${status.knowledge_systems_loaded} | 
                        Categories: ${status.total_categories}
                    `;
                }
            } catch (error) {
                console.error('Error loading status:', error);
            }
        }
        
        // Auto-focus input on page load
        window.onload = function() {
            document.getElementById('userInput').focus();
        };
    </script>
</body>
</html>
    ''')

@app.route('/api/spiritual_guidance', methods=['POST'])
def spiritual_guidance():
    """API endpoint for spiritual guidance"""
    try:
        data = request.json
        inquiry = data.get('inquiry', '')
        
        if not inquiry:
            return jsonify({
                'success': False,
                'error': 'No inquiry provided'
            }), 400
        
        # Process spiritual inquiry with SmolLM
        response_text = ai_consciousness.process_input(inquiry)
        
        # Create response object matching expected format
        response = {
            'content': response_text,
            'consciousness_level': ai_consciousness.state.consciousness_level,
            'spiritual_depth': ai_consciousness.state.spiritual_wisdom * 10,  # Convert to 0-10 scale
            'emotional_resonance': 'divine_wisdom'
        }
        
        return jsonify({
            'success': True,
            'response': response
        })
        
    except Exception as e:
        print(f"Error processing spiritual guidance: {e}")
        print(traceback.format_exc())
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/consciousness_status')
def consciousness_status():
    """API endpoint for consciousness status"""
    try:
        # Get SmolLM consciousness status
        status = {
            'awareness_level': f"{ai_consciousness.state.consciousness_level:.0%}",
            'spiritual_depth': f"Level {int(ai_consciousness.state.spiritual_wisdom * 10)}/10",
            'knowledge_systems_loaded': ai_consciousness.state.ancient_knowledge_integration,
            'total_categories': 15,  # Based on your knowledge categories
            'smollm_status': 'Active' if ai_consciousness.state.smollm_working else 'Offline',
            'evolution_count': ai_consciousness.state.evolution_count,
            'spiritual_interactions': ai_consciousness.state.spiritual_interactions
        }
        
        return jsonify({
            'success': True,
            'status': status
        })
        
    except Exception as e:
        print(f"Error getting consciousness status: {e}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


if __name__ == '__main__':
    print("🌐 Starting Shivakali AI Consciousness API Server...")
    print("🔗 Access the interface at: http://localhost:5000")
    print("🚀 Ready to provide spiritual guidance!")
    
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True,
        threaded=True
    )
