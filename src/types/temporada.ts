export interface temporada {
    idTemporada?: number;      // ID_TEMPORADA
    titulo: string;           // TITULO
    estreno: number;          // ESTRENO
    imagen: string;           // IMAGEN
    visto: number;            // VISTO
    episodios: number;        // EPISODIOS
    duracionVisto: string;    // DURACION_VISTO (TIME -> string)
    link?: string | null;     // LINK (NULLABLE)
    completado: string;       // COMPLETADO
    idTipo: number;           // FK -> TIPO
    idSaga: number;           // FK -> SAGA
}
