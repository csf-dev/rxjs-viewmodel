//@flow
import type { Scheduler } from './Scheduler';
import { MissingBrowserError } from '../errors/MissingBrowserError';

function getDocumentElement() : HTMLElement {
    if(!document.documentElement) throw new MissingBrowserError('The document must have a root element');
    return document.documentElement;
}

export default function tryGetReadyStateChangeScheduler() : ?Scheduler {
    if(!window || !window.document || !('onreadystatechange' in document.createElement('script')))
        return null;

    return function() {
        const script = document.createElement('script');

        return new Promise((resolve, reject) => {
            const doc = getDocumentElement();
            script.onreadystatechange = () => {
                script.onreadystatechange = null;
                doc.removeChild(script);
                resolve();
            };
            doc.appendChild(script);
        });
    }
}
