# Void Cascade

Void Cascade is a unique JavaScript-based puzzle game where players manipulate void orbs to balance gravitational fields. Align orbs with matching polarities (positive, negative, neutral) in adjacent grid cells to create balanced fields, earning points and advancing through void cycles. Built with Node.js and the `canvas` library, this game is designed for developers seeking a modular, extensible project.

## Features
- **Gravitational Gameplay**: Align orbs with matching polarities horizontally or vertically to balance gravitational fields.
- **Void Cycles**: Progress through cycles as you score, increasing orb counts and stability levels.
- **Modular JavaScript**: Clean, object-oriented code for seamless integration and extension.
- **Canvas Rendering**: Server-side rendering with the `canvas` library, suitable for desktop or web applications.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/void-cascade.git
   ```
2. Navigate to the project directory:
   ```bash
   cd void-cascade
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the game:
   ```bash
   npm start
   ```

## How to Play
- **Objective**: Align adjacent orbs with the same polarity (positive: red, negative: blue, neutral: green) horizontally or vertically by cycling their polarities.
- **Scoring**: Each balanced field earns 35 points multiplied by the current cycle.
- **Cycle Progression**: Reach 350 points per cycle to advance, increasing orb count and stability levels.
- **Interaction**: Use `game.handleClick(x, y)` to cycle orb polarities (requires UI integration).
- **Reset**: Call `game.reset()` to restart the game.

## Development
- **Tech Stack**: Node.js, JavaScript, `canvas`
- **Dependencies**: `canvas` for rendering
- **Code Structure**:
  - `index.js`: Main game logic and canvas rendering.
  - `orb.js`: Orb class for void entities.
  - `package.json`: Project metadata and dependencies.
- **Extending**: Integrate with a UI framework (e.g., Electron for desktop or a web server) to handle input and display the canvas.

## Notes
- The current implementation outputs a PNG snapshot (`output.png`) for testing. For interactive play, integrate with a UI framework to handle mouse clicks and real-time rendering.
- Example integration: Use Electron for a desktop app or a WebSocket server for web-based play.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes. For major updates, open an issue first to discuss your ideas.

## Support
If you enjoy Void Cascade and want to support its development, consider sponsoring me on [GitHub Sponsors](https://github.com/sponsors/your-username). Your support helps keep this project alive and growing!

## License
MIT License. See [LICENSE](LICENSE) for details.