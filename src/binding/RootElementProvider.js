//@flow
import getDocumentBody from './Document';

export interface GetsRootHtmlElement {
    getRootElement() : HTMLElement;
}

export class RootElementProvider implements GetsRootHtmlElement {
    getRootElement() : HTMLElement { return getDocumentBody(); }
}

const staticProvider : GetsRootHtmlElement = new RootElementProvider();

export default function getRootElementProvider() : GetsRootHtmlElement { return staticProvider;  }