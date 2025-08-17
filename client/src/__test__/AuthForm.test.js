import React from "react";
import {getByPlaceholderText, getByText, render, screen} from '@testing-library/react';
import { AuthForm } from "../components/AuthForm";
import userEvent from "@testing-library/user-event";


describe('AuthForm',()=>{
    const mockHandleSignUp = jest.fn();
    const mockHandleSignIn = jest.fn();

    beforeEach(()=>{
        mockHandleSignIn.mockClear();
        mockHandleSignUp.mockClear();
    });


    test('AuthForm is rendering',()=>{
        // Arrange
        render(<AuthForm handleSignIn={mockHandleSignIn} handleSignUp={mockHandleSignUp}/>);

        // Act

        // Assert
        expect(screen.getByRole('heading',{level:3, name:'Log In'})).toBeInTheDocument();
        expect(screen.getByRole('button',{name:'Log In'})).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
    })

    test('toggle to signup form when "Switched to Sign Up" is clicked',async ()=>{
        render(<AuthForm handleSignIn={mockHandleSignIn} handleSignUp={mockHandleSignUp}/>);

        const button = screen.getByRole('button',{name:'Switch to Sign Up'});
        await userEvent.click(button);

        expect(screen.getByRole('heading',{level:3,name:'Sign Up'})).toBeInTheDocument();
        expect(screen.getByRole('button',{name:'Sign Up'})).toBeInTheDocument();
    })

    test('update form data on input change', async ()=>{
        render(<AuthForm/>);
        const emailInput = screen.getByPlaceholderText('Enter email');
        const passInput = screen.getByPlaceholderText('Enter password');

        await userEvent.type(emailInput,'abc@gmail.com');
        await userEvent.type(passInput, '1234567');

        expect(emailInput).toHaveValue('abc@gmail.com');
        expect(passInput).toHaveValue('1234567');
    })

    test('calls handleSignIn on form submit in Log In mode', async ()=>{
        render(<AuthForm handleSignUp={mockHandleSignUp} handleSignIn={mockHandleSignIn}/>);
        const emailInput = screen.getByPlaceholderText('Enter email');
        const passInput = screen.getByPlaceholderText('Enter password');
        const loginButton = screen.getByRole('button',{name:'Log In'});

        await userEvent.type(emailInput, 'abc@gmail.com');
        await userEvent.type(passInput, '1234567');
        await userEvent.click(loginButton);

        expect(mockHandleSignIn).toHaveBeenCalledWith({
            email:'abc@gmail.com',
            password:'1234567'
        })

    })

    test('calls handleSignUp on form submit in Sign Up mode', async ()=>{
        render(<AuthForm handleSignUp={mockHandleSignUp} handleSignIn={mockHandleSignIn}/>);
        await userEvent.click(screen.getByRole('button',{name:'Switch to Sign Up'}));
        const emailInput = screen.getByPlaceholderText('Enter email');
        const passInput = screen.getByPlaceholderText('Enter password');
        const SignUpButton = screen.getByRole('button',{name:'Sign Up'});

        await userEvent.type(emailInput, 'abc@gmail.com');
        await userEvent.type(passInput, '1234567');
        await userEvent.click(SignUpButton);

        expect(mockHandleSignUp).toHaveBeenCalledWith({
            email:'abc@gmail.com',
            password:'1234567'
        })

    })
})