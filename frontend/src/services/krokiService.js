import fetch from 'node-fetch';
const createDiagram = async (diagramText, format = 'png') => {
    try {
      // Validate the 'type' and 'description' properties
      if (!diagramText || !diagramText.type || !diagramText.description) {
        throw new Error('Invalid diagram description. "type" and "description" are required.');
      }
  
      const { type, description } = diagramText;
  
      const response = await fetch(`https://kroki.io/${type}/${format}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: description,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const arrayBuffer = await response.arrayBuffer();
      const base64String = btoa(
        String.fromCharCode(...new Uint8Array(arrayBuffer))
      );
      const imageDataUri = `data:image/${format};base64,${base64String}`;
  
      return imageDataUri;
    } catch (error) {
      console.error('Error creating diagram:', error.message);
      throw error;
    }
  };
  
  export default createDiagram;
  

