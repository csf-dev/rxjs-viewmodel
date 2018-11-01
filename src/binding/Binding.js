//@flow
import { BindingContext } from '../context';

export type Binding = {
    binding : (context : BindingContext<?{},{}>) => void
}
