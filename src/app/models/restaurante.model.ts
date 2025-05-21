// src/app/models/restaurante.model.ts

export interface RestauranteRaw {
  idRestaurante?: number;
  nombre:     string;
  direccion:  string;
  menu:       any;      // <— ahora un objeto JSON, no string
}


/** Promo parseada */
export interface Promo {
  url:    string;
  nombre: string;
  precio: number;
}

/** Lo que utilizan tus componentes */
export interface Restaurante {
  idRestaurante?: number;   // opcional porque al crear puede no existir aún
  nombre:        string;
  direccion:     string;
  promos:        Promo[];
}
