//@flow

export interface IsReplacable<-T : mixed> {
    replaceWith(instance : T) : void;
}