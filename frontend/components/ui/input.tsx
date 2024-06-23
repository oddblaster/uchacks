import * as React from 'react';
import { TextInput, StyleSheet, View, TextInputProps } from 'react-native';

export interface InputProps extends TextInputProps {}

const Input = React.forwardRef<TextInput, InputProps>(
  ({ style, ...props }, ref) => {
    return (
      <View style={[styles.container, style]}>
        <TextInput
          style={styles.input}
          ref={ref}
          {...props}
        />
      </View>
    );
  }
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    height: 40,
    width: '100%',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#d1d5db', // Corresponds to border-input
    backgroundColor: '#fff', // Corresponds to bg-background
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 14,
    color: '#000',
  },
  // Add more styles as needed for focus, disabled, etc.
});

export { Input };
