export interface Component {

    readonly container : HTMLSpanElement | HTMLDivElement;
    
}

export interface Selectable<T> {

    onselect: ((selection: ReadonlySet<T>)=>void)|null;

}
