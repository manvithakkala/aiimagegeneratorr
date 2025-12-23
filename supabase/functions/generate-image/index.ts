import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { encode as base64Encode } from "https://deno.land/std@0.168.0/encoding/base64.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, style } = await req.json();
    
    console.log('Generating image with prompt:', prompt, 'style:', style);

    const CLIPDROP_API_KEY = Deno.env.get('CLIPDROP_API_KEY');
    
    if (!CLIPDROP_API_KEY) {
      throw new Error('CLIPDROP_API_KEY is not configured');
    }

    // Enhance prompt with style
    const enhancedPrompt = style && style !== 'None' 
      ? `${prompt}, ${style} style, high quality, detailed`
      : `${prompt}, high quality, detailed`;

    // Create form data for the API request
    const formData = new FormData();
    formData.append('prompt', enhancedPrompt);

    console.log('Calling Clipdrop API...');

    const response = await fetch('https://clipdrop-api.co/text-to-image/v1', {
      method: 'POST',
      headers: {
        'x-api-key': CLIPDROP_API_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Clipdrop API error:', response.status, errorText);
      throw new Error(`Clipdrop API error: ${response.status} - ${errorText}`);
    }

    // Get the image as array buffer and convert to base64 safely
    const arrayBuffer = await response.arrayBuffer();
    const base64 = base64Encode(arrayBuffer);
    const imageUrl = `data:image/png;base64,${base64}`;

    console.log('Image generated successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        imageUrl,
        prompt: enhancedPrompt 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    console.error('Error generating image:', errorMessage);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
