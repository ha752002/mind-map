"use client";

import * as React from "react";
import {NextUIProvider} from "@nextui-org/system";
import {useRouter} from 'next/navigation'
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {ThemeProviderProps} from "next-themes/dist/types";
import {ReactFlowProvider} from "reactflow";
import {Provider} from "react-redux";
import {store} from "@/redux/store";
import {ClerkProvider} from "@clerk/nextjs";
import 'reactflow/dist/style.css';


export interface ProvidersProps {
    children: React.ReactNode;
    themeProps?: ThemeProviderProps;
}

export function Providers({children, themeProps}: ProvidersProps) {
    const router = useRouter();

    return (
        <Provider store={store}>
            <NextUIProvider navigate={router.push}>
                <NextThemesProvider {...themeProps}>
                    <ReactFlowProvider>
                        <ClerkProvider >
                            {children}
                        </ClerkProvider>
                    </ReactFlowProvider>
                </NextThemesProvider>
            </NextUIProvider>
        </Provider>
    );
}
