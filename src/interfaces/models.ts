export interface Film {
    id?: number;
    title: string;
    director?: string;
    duration?: number;
  }
  
  export interface Character {
    scene?: {

      id: number;
  
    };
    id?: number;
    description: string;
    cost?: number;
    stock?: number;
    scene_id: number;
  }
  
  export interface Scene {

    id?: number;
    description: string;
    budget?: number;
    minutes?: number;
    film_id: number;
  }
  