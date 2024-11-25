export interface Servicio {
    servicio_id: number;
    tipo_servicio: string;
    ubicacion: string;
    costo: string;
    disponibilidad: boolean;
    proveedor_id: number;
    disponibilidadpago: boolean;
    descripcion: string;
    status?: string; // Si usas status para filtrar si es hecho o no
  }