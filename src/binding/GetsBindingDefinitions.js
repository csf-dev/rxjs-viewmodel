//@flow
import { BindingContext } from '../context/BindingContext';

export type BindingDefinition = {
    elements : Array<HTMLElement>,
    binding : (context : BindingContext<?{},{}>) => void
}

export interface GetsBindingDefinitions {
    getBindings() : Array<BindingDefinition>;
}