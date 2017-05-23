export interface Component {

    container : HTMLSpanElement | HTMLDivElement;

    initialize(): void;

    dispose(): void; 
}