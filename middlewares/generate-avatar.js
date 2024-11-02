import { createCanvas } from 'canvas';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';


function darkenColor(color, percentage) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const darkerR = Math.round(r * (1 - percentage));
    const darkerG = Math.round(g * (1 - percentage));
    const darkerB = Math.round(b * (1 - percentage));

    const darkerHex = `#${darkerR.toString(16)}${darkerG.toString(16)}${darkerB.toString(16)}`;
    return darkerHex;
}

export function generate(name, options) {
    const { width, palette, fontProportion } = options;

    // Extract the first letters of first name and last name
    const [firstNameInitial, lastNameInitial] = name.split(' ').map(word => word.charAt(0).toUpperCase());

    // Create a canvas
    const canvas = createCanvas(width, width);
    const ctx = canvas.getContext('2d');

    // Generate random colors from the palette
    const randomColor = palette[Math.floor(Math.random() * palette.length)];

    // Fill the canvas with the random color
    ctx.fillStyle = randomColor;
    ctx.fillRect(0, 0, width, width);

    // Set font properties
    const fontSize = width * fontProportion;
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = darkenColor(randomColor, 0.2); // Text color

    // Calculate the width of each initial
    const firstNameWidth = ctx.measureText(firstNameInitial).width;
    const lastNameWidth = ctx.measureText(lastNameInitial).width;

    // Calculate position to center the initials
    const totalWidth = firstNameWidth + lastNameWidth;
    const x = (width - totalWidth) / 2;
    const y = width / 2 + fontSize / 2;

    // Draw the initials
    ctx.fillText(firstNameInitial, x, y);
    ctx.fillText(lastNameInitial, x + firstNameWidth, y);

    // Generate a unique filename
    const filename = `${Date.now()}_${name.replace(/\s/g, '_').toLowerCase()}.png`;
    const __dirname = dirname(fileURLToPath(import.meta.url));

    // Save the canvas as an image file
    const imagePath = path.join(__dirname, '../public/images/user', filename);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(imagePath, buffer);

    return filename;
}