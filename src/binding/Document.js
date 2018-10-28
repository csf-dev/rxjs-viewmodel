//@flow
import { Window } from 'window';

export default function getDocumentBody() : HTMLElement {
    const win = window || new Window();
    return win.document.body;
}