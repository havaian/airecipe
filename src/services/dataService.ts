import { CONFIG } from '../config/config'

export interface MenuItem {
  name: string;
  price: string;
  description: string;
  ingredients: string[];
  allergens: string[];
  history: string;
  imageUrls?: string[];
}

export interface MenuCategory {
  name: string;
  items: MenuItem[];
}

export interface MenuData {
  categories: MenuCategory[];
  timestamp: number;
  originalImage?: string; // Base64 encoded original menu image
}

class DataService {
  private static instance: DataService;
  private currentMenu: MenuData | null = null;
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
  private readonly STORAGE_KEY = 'menu_data_cache';

  private constructor() {
    // Load cache from localStorage
    const savedData = localStorage.getItem(this.STORAGE_KEY);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      if (Date.now() - parsed.timestamp <= this.CACHE_DURATION) {
        this.currentMenu = parsed;
      } else {
        localStorage.removeItem(this.STORAGE_KEY);
      }
    }
  }

  public static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  private saveToStorage(): void {
    if (this.currentMenu) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.currentMenu));
    }
  }

  private async convertImageToBase64(image: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(image);
    });
  }

  public async setMenuData(menuData: any, originalImage?: File, imageCount: number = 6): Promise<void> {
    let originalImageBase64: string | undefined;
    
    if (originalImage) {
      try {
        originalImageBase64 = await this.convertImageToBase64(originalImage);
      } catch (error) {
        console.error('Error converting image to base64:', error);
      }
    }

    this.currentMenu = {
      categories: menuData.categories,
      timestamp: Date.now(),
      originalImage: originalImageBase64
    };
    
    const imagePromises = this.currentMenu.categories.flatMap(category =>
      category.items.map(item => this.fetchImagesForDish(item, imageCount))
    );

    Promise.all(imagePromises).catch(error => 
      console.error('Error fetching some images:', error)
    );

    this.saveToStorage();
  }

  private async fetchImagesForDish(item: MenuItem, count: number = 6): Promise<void> {
    try {
      const response = await fetch(
        `${CONFIG.GOOGLE_SEARCH_ENDPOINT}?key=${CONFIG.GOOGLE_SEARCH_API_KEY}&cx=${CONFIG.GOOGLE_SEARCH_CX}&q=${encodeURIComponent(item.name + ' photo')}&searchType=image&num=${count}`,
        {
          headers: {
            'Accept': 'application/json',
          },
        }
      );
      
      if (!response.ok) throw new Error('Failed to fetch images');
      
      const data = await response.json();
      item.imageUrls = data.items?.map((img: any) => img.link) || [];
      this.saveToStorage();
    } catch (error) {
      console.error(`Error fetching images for ${item.name}:`, error);
      item.imageUrls = [];
    }
  }

  public getMenuData(): MenuData | null {
    return this.currentMenu;
  }

  public getOriginalMenuImage(): string | null {
    return this.currentMenu?.originalImage || null;
  }

  public getMenuItem(itemName: string): MenuItem | null {
    if (!this.currentMenu) return null;

    for (const category of this.currentMenu.categories) {
      const item = category.items.find(
        item => item.name.toLowerCase() === itemName.toLowerCase()
      );
      if (item) return item;
    }
    return null;
  }

  public clearData(): void {
    this.currentMenu = null;
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

export const dataService = DataService.getInstance();