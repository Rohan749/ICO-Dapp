"use client";

import Image from "next/image";
import Header from "./components/Header";
import Body from "./components/Body";
import Functions from "./components/Functions";
import { MantineProvider } from "@mantine/core";
import { http, createConfig, WagmiProvider, injected, useAccount } from "wagmi";
import {
  mainnet,
  sepolia,
  holesky,
  polygon,
  optimism,
  arbitrum,
  base,
} from "wagmi/chains";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createClient } from "viem";
import { metaMask, safe } from "wagmi/connectors";
import { AccountProvider } from "./context/context";
import { Toaster } from "react-hot-toast";



const queryClient = new QueryClient();
const config = getDefaultConfig({
  projectId: "MY_PROJECT_ID",
chains: [mainnet, polygon, optimism, arbitrum, base, holesky],
})

export default function Home() {

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider chains={[mainnet, polygon, optimism, arbitrum, base, holesky, sepolia]}>
          <AccountProvider>
          <MantineProvider>
            <div className=" items-center justify-items-center min-h-screen p-8 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
              <Header />
              <Body />
              <Functions />
              <Toaster />
            </div>
          </MantineProvider>
          </AccountProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
