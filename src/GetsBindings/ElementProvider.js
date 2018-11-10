//@flow

export interface GetsAllHTMLElements {
    getAllElements(rootElement : HTMLElement) : Array<HTMLElement>;
}

function* getElementGenerator(rootElement : HTMLElement) {
    let
        current : HTMLElement = rootElement,
        path : Array<HTMLElement> = [],
        backTracking = false;

    do {
        if(!backTracking) yield current;

        if(current.children.length !== 0 && !backTracking) {
            path.push(current);
            current = current.children[0];
            continue;
        }

        backTracking = false;

        if(current.nextElementSibling
           && current.nextElementSibling instanceof HTMLElement) {
            current = current.nextElementSibling;
        }
        else if(path.length > 0) {
            current = path.pop();
            backTracking = true;
        }

    } while(current !== rootElement)
}

export class ElementProvider implements GetsAllHTMLElements {
    getAllElements(rootElement : HTMLElement) : Array<HTMLElement> {
        return Array.from(getElementGenerator(rootElement));
    }
}

const singletonProvider = new ElementProvider();

export default function getElementProvider() : GetsAllHTMLElements { return singletonProvider; }