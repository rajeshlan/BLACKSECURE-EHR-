const fs = require('fs');
const path = require('path');

// Define the source and destination paths
const sourcePath = path.join(__dirname, 'artifacts/contracts/ComprehensivePatientData.sol/ComprehensivePatientData.json');
const destinationPath = path.join(__dirname, 'src/abis/ComprehensivePatientData.json');

// Ensure the destination directory exists
const destinationDir = path.dirname(destinationPath);
if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir, { recursive: true });
}

// Copy the ABI file
fs.copyFileSync(sourcePath, destinationPath);

console.log('ABI copied to src/abis/');
