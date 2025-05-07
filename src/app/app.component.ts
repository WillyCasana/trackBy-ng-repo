import { Component } from '@angular/core';

interface Item {
  id: number;
  name: string;
  value: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent {
  title = 'trackBy Demo';
  items: Item[] = [];
  updateCount = 0;

  constructor() {
    // Initialize with a large number of items to demonstrate performance issue
    this.generateItems();
  }

  generateItems() {
    console.time('Generate Items');
    
    // Create 3000 items (large enough to cause noticeable performance issues)
    this.items = Array.from({ length: 3000 }, (_, index) => ({
      id: index,
      name: `Item ${index}`,
      value: Math.floor(Math.random() * 100)
    }));
    
    console.timeEnd('Generate Items');
  }

  // This will update all items with new random values, but keep the same IDs
  // Without trackBy, this will cause a complete re-render of all DOM elements
  updateItems() {
    console.time('Update Items');
    
    // Create a new array with the same IDs but new values
    this.items = this.items.map(item => ({
      ...item,
      value: Math.floor(Math.random() * 100)
    }));
    
    this.updateCount++;
    console.timeEnd('Update Items');
  }

  // Add one item at the beginning (another operation that's slow without trackBy)
  addItem() {
    const newItem = {
      id: this.items.length > 0 ? Math.max(...this.items.map(item => item.id)) + 1 : 0,
      name: `New Item ${this.updateCount}`,
      value: Math.floor(Math.random() * 100)
    };
    
    this.items = [newItem, ...this.items];
    this.updateCount++;
  }

  trackByItem(index: number, item: any):number{
    return item.id;
  }
}
