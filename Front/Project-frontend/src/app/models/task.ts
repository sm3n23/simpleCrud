export interface Task {
    id?: number;
    titre: string;
    description: string;
    dateCreation?: Date;
    dateEcheance: Date;
    statut: 'A_FAIRE' | 'EN_COURS' | 'TERMINE';
    projetId: number;
}