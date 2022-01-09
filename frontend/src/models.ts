export type FlashCardModel = {
    _id: string;
    original: string;
    translation: string;
    original_language?: string;
    translation_language?: string;
    example?: string;
    description?: string;
}

export type PileModel = {
    _id: string;
    name: string;
    original_language: string;
    translation_language: string;
    flashcards_ids: string[]
}

export type PileFlashCardsModel = {
    pile: PileModel;
    flashcards: FlashCardModel[];
}