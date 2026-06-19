# LuraStudy Website

This is the official GitHub Pages website for [LuraStudy](https://github.com/JoshuaJeffreyGimmel/lurastudy) — your private, self-hosted AI study assistant.

## Deployment

This site is deployed via GitHub Pages. To update:

1. Push changes to the `main` branch
2. Go to Settings → Pages → ensure deployment source is set to `main` branch, root directory
3. The site will be available at `https://joshuajeffreygimmel.github.io/lurastudy-website/`

## Local Development

```bash
# Start a local HTTP server
python -m http.server 8080
# Then open http://localhost:8080
```

## Adding Media

Replace the placeholders in the Gallery section with your own screenshots, GIFs, or videos:

1. Add image files to `assets/images/`
2. Update the `<img>` or `<video>` tags in `index.html` (Gallery section)
3. For GIFs/videos, you can replace the `.media__placeholder` divs with proper media elements

## Customization

- **Colors**: Edit CSS variables in `css/style.css` under `:root` and `[data-theme="light"]`
- **Content**: Edit text in `index.html`
- **Logo**: Replace the inline SVG logo in `index.html` or swap with an image in `assets/images/`

## License

MIT