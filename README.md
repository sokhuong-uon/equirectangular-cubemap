# Equirectangular to Cubemap
Take an Equirectangular or 360 Panorama image as input and return Cubemap images (6 images with a 1:1 aspect ratio).

## Usage
Visit https://equirectangular-cubemap.vercel.app/ and you will be welcomed with the UI like the following image.

The main view is a 3D scene where you can see:
- 360 Panorama image around your view.
- Visually, a cube with the same texture as the panorama.

At the top-right corner is the settings menu.

<img src="https://github.com/sokhuong-uon/equirectangular-cubemap/assets/77433349/24f4339f-694c-402f-8cce-22bbb43a89cc" width="400"/>

### Settings Menu
Adjust the view and functionality.

#### Setting
1. **Angle**: rotate the cube's texture.

   <img src="https://github.com/sokhuong-uon/equirectangular-cubemap/assets/77433349/0adcc318-5f11-4d7e-aad2-3d37cd7a0437" width="300"/>
   <img src="https://github.com/sokhuong-uon/equirectangular-cubemap/assets/77433349/bc588862-98c3-40bd-bf64-157c61cf41a6" width="300"/>
   <img src="https://github.com/sokhuong-uon/equirectangular-cubemap/assets/77433349/4acb95ad-55d6-46ed-90c9-a5721eb35f2c" width="300"/>
2. **Dimension**: resolution of the image.

   - Preset values are 256, 512, 1024, 2048, and 4096 pixels.
   - The higher the value the slower the rendering will be.

   - 256 pixels will make the image blurry.
3. **Mode**: view as box or flat image.

   <img src="https://github.com/sokhuong-uon/equirectangular-cubemap/assets/77433349/5fa6bb10-6411-4f39-9489-82a26aaa1760" width="300"/>
   
## Local Development
**Note**: Make sure you have **Node.js** installed on your machine.

1. Clone the repo.
2. Change directory to _equirectangular-cubemap_.
   ```bash
   cd equirectangular-cubemap
   ```
3. Install dependencies:
   ```bash
   pnpm i # you can use `yarn` or `npm install` or `bun install`
   ```
   if you want to use `pnpm` but haven't enabled it yet, you can run `corepack enable` to enable yarn and pnpm.
4. Run local server
   ```bash
   pnpm dev
   ```

## Acknowledgement
### Image source
 - [christmas_photo_studio_04](https://polyhaven.com/a/christmas_photo_studio_04) by [Sergej Majboroda](https://hdrmarket.com/)
