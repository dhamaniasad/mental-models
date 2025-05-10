# Adding Images to Mental Models

This guide explains how to add new images to existing mental models in the application.

## Directory Structure

Images for mental models are stored in the `/public/images/` directory, with each mental model having its own subdirectory. The directory name should match the model ID in kebab-case format.

Current image directories:

- `/public/images/divergent/` - Divergent Thinking images
- `/public/images/lateral-thinking/` - Lateral Thinking images (planned)
- `/public/images/contrarian-thinking/` - Contrarian Thinking images (planned)
- `/public/images/probabilistic-thinking/` - Probabilistic Thinking images (planned)
- `/public/images/black-swan-theory/` - Black Swan Theory images (planned)

## File Naming Convention

Images should follow a consistent naming convention:

- For Divergent Thinking: `div1.png`, `div2.png`, etc.
- For other models, use a prefix of `img`: `img1.png`, `img2.png`, etc.

## Image Requirements

- Images should be in PNG format for best quality and transparency support
- Recommended image dimensions: At least 800x600 pixels
- Images should have a clean background (preferably white or transparent)
- For best display, ensure the main content has some margin around it
- Maintain consistent style across all images for a given mental model

## Adding New Images

1. Create a directory for the mental model if it doesn't exist:
   ```bash
   mkdir -p /public/images/[model-id]
   ```

2. Add your images to the directory following the naming convention.

3. Update the `getMaxImagesForModel` function in `src/components/ModelViewer.tsx` to include the correct count of images for the model:

   ```typescript
   const getMaxImagesForModel = (modelId: string) => {
     switch (modelId) {
       case 'divergent-thinking':
         return 4;
       case 'lateral-thinking':
         return 4; // Update this number when adding images
       // Add other models here
       default:
         return 0;
     }
   };
   ```

4. Test the model page to ensure images are displayed correctly and rotate as expected.

## Image Generation Guidelines

When creating images for mental models, consider the following guidelines:

1. **Clarity**: The image should clearly represent the concept it's illustrating
2. **Simplicity**: Avoid overly complex visuals that might confuse users
3. **Consistency**: Maintain a consistent style and color palette across all images
4. **Professional**: Images should have a clean, professional appearance
5. **Educational**: Images should help users understand the mental model concepts

Remember that images will be displayed in the interactive framework section and should enhance understanding of the mental model.