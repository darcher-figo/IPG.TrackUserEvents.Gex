import { AriaAttributes, DetailsHTMLAttribute, PointerEventHandler, ChangeEventHandler, KeyboardEventHandler } from 'react';


type SetupArgs = Partial<{
  id,
  name,
  value,
  label,
  controls,
  placeholder,
}>;

type StateArgs = Partial<{
  require,
  cleared,
  emptied,
  enabled,
  focused,
  invalid,
  visible,
  checked,
}>;

type AlertArgs = Partial<{
  empty,
  error,
  valid,
}>;

interface FormNode<T> extends DetailedHTMLProps<T>, AriaAttributes {
  hints: Record<keyof SetupArgs, string>;
  setup: Record<keyof StateArgs, string>;
  state: Record<keyof NotesArgs, boolean>;
  onPress?: PointerEventHandler<T>;
  onChange?: ChangeEventHandler<T>;
  onInput?: KeyboardEventHandler<T>;
}