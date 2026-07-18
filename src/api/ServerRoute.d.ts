export interface NotesRequestOptions {
    page?: number;
    limit?: number;
    search?: string;
    sort?: string;
}
export declare const getAllNotes: ({ page, limit, search, sort, }?: NotesRequestOptions) => Promise<any>;
export declare const getAllNotesDetails: (id: string) => Promise<any>;
