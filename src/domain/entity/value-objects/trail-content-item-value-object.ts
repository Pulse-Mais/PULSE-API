export interface ContentBlock<T> {
    idClassOrActivity: string; 
    index: number;  
    type: 'text' | 'file' | 'alternatives' | 'dissertative' | 'video'; 
    content: T; 
    upload: {
        status: 'pending' | 'uploaded' | 'error';
        errorMessage?: string;
    }
}
