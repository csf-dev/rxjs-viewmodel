//@flow
import BindingsInitializer from './BindingsInitializer';

export default function applyBindings(element : HTMLElement, viewModel : mixed, options? : {}) {
    const initializer = new BindingsInitializer(element, options);
    return initializer.initialize(viewModel);
}