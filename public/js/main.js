// Import necessary modules
import Dashboard from './components/Dashboard.js';
import DataVisualization from './components/DataVisualization.js';

// Main application
class Main {
    constructor() {
        this.dashboard = new Dashboard();
        this.dataVisualization = new DataVisualization();
    }

    // Initialize the application
    init() {
        this.dashboard.init();
        this.dataVisualization.init();
    }
}

// Create a new instance of the application
const app = new Main();

// Mount the application to the DOM
window.onload = () => {
    app.init();
};
