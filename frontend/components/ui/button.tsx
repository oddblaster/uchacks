import * as React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { type VariantProps } from 'class-variance-authority';

const buttonVariants = {
  default: {
    container: {
      backgroundColor: '#007bff', // bg-primary
      borderColor: '#007bff', // bg-primary/90
    } as ViewStyle,
    text: {
      color: '#fff', // text-primary-foreground
    } as TextStyle,
  },
  destructive: {
    container: {
      backgroundColor: '#dc3545', // bg-destructive
      borderColor: '#dc3545', // bg-destructive/90
    } as ViewStyle,
    text: {
      color: '#fff', // text-destructive-foreground
    } as TextStyle,
  },
  outline: {
    container: {
      backgroundColor: '#fff', // bg-background
      borderColor: '#ced4da', // border-input
      borderWidth: 1,
    } as ViewStyle,
    text: {
      color: '#000', // text
    } as TextStyle,
  },
  secondary: {
    container: {
      backgroundColor: '#6c757d', // bg-secondary
      borderColor: '#6c757d', // bg-secondary/80
    } as ViewStyle,
    text: {
      color: '#fff', // text-secondary-foreground
    } as TextStyle,
  },
  ghost: {
    container: {
      backgroundColor: 'transparent',
    } as ViewStyle,
    text: {
      color: '#007bff', // text-accent-foreground
    } as TextStyle,
  },
  link: {
    container: {
      backgroundColor: 'transparent',
    } as ViewStyle,
    text: {
      color: '#007bff', // text-primary
      textDecorationLine: 'underline',
    } as TextStyle,
  },
};

const buttonSizes = {
  default: {
    container: {
      height: 40,
      paddingHorizontal: 16,
      paddingVertical: 8,
    } as ViewStyle,
    text: {
      fontSize: 14,
    } as TextStyle,
  },
  sm: {
    container: {
      height: 36,
      paddingHorizontal: 12,
      borderRadius: 4,
    } as ViewStyle,
    text: {
      fontSize: 14,
    } as TextStyle,
  },
  lg: {
    container: {
      height: 44,
      paddingHorizontal: 32,
      borderRadius: 4,
    } as ViewStyle,
    text: {
      fontSize: 14,
    } as TextStyle,
  },
  icon: {
    container: {
      height: 40,
      width: 40,
    } as ViewStyle,
    text: {
      fontSize: 14,
    } as TextStyle,
  },
};

export interface ButtonProps extends React.ComponentProps<typeof TouchableOpacity> {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  asChild?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<TouchableOpacity, ButtonProps>(
  ({ variant = 'default', size = 'default', asChild = false, style, children, ...props }, ref) => {
    const containerStyle = [styles.button, buttonVariants[variant]?.container, buttonSizes[size]?.container, style];
    const textStyle = [styles.text, buttonVariants[variant]?.text, buttonSizes[size]?.text];

    return (
      <TouchableOpacity ref={ref} style={containerStyle} {...props}>
        <Text style={textStyle}>{children}</Text>
      </TouchableOpacity>
    );
  }
);
Button.displayName = 'Button';

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  text: {
    fontWeight: '500',
  },
});

export { Button, buttonVariants };
