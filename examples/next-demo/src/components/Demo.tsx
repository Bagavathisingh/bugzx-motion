'use client';

import {
    Button,
    Input,
    Tabs, TabsList, TabsTrigger, TabsContent,
    Accordion, AccordionItem, AccordionTrigger, AccordionContent,
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
    Checkbox, Switch,
    Motion
} from "@bugzx-motion/next";
import { useState } from "react";

export function Demo() {
    const [count, setCount] = useState(0);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-zinc-950 text-white">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <Motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent"
                >
                    bugzx-motion
                </Motion.h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mt-12">
                {/* Buttons Section */}
                <section className="p-6 border border-zinc-800 rounded-xl bg-zinc-900/50">
                    <h2 className="text-xl font-semibold mb-4">Button Presets</h2>
                    <div className="flex flex-col gap-4">
                        <Button motion="scale">Scale Hover</Button>
                        <Button variant="secondary" motion="fade">Fade Hover</Button>
                        <Button variant="outline" motion="pop">Pop Enrty</Button>
                        <Button motion="scale" onClick={() => setCount(c => c + 1)}>
                            Count: {count}
                        </Button>
                    </div>
                </section>

                {/* Form Section */}
                <section className="p-6 border border-zinc-800 rounded-xl bg-zinc-900/50">
                    <h2 className="text-xl font-semibold mb-4">Motion Input</h2>
                    <div className="space-y-4">
                        <Input placeholder="Type something..." />
                        <Input type="password" placeholder="Password" />
                    </div>
                </section>

                {/* Tabs Section */}
                <section className="p-6 border border-zinc-800 rounded-xl bg-zinc-900/50">
                    <h2 className="text-xl font-semibold mb-4">Animated Tabs</h2>
                    <Tabs defaultValue="tab1">
                        <TabsList className="w-full">
                            <TabsTrigger value="tab1" className="flex-1">Tab 1</TabsTrigger>
                            <TabsTrigger value="tab2" className="flex-1">Tab 2</TabsTrigger>
                        </TabsList>
                        <TabsContent value="tab1" animation="slide">
                            <p className="p-4 text-zinc-400">Content for Tab 1 with slide animation.</p>
                        </TabsContent>
                        <TabsContent value="tab2" animation="fade">
                            <p className="p-4 text-zinc-400">Content for Tab 2 with fade animation.</p>
                        </TabsContent>
                    </Tabs>
                </section>

                {/* Accordion Section */}
                <section className="p-6 border border-zinc-800 rounded-xl bg-zinc-900/50">
                    <h2 className="text-xl font-semibold mb-4">Accordion</h2>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Is it animated?</AccordionTrigger>
                            <AccordionContent>
                                Yes. It uses the native motion engine for smooth height transitions.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Is it accessible?</AccordionTrigger>
                            <AccordionContent>
                                Yes. It builds on top of Radix UI primitives.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </section>

                {/* Dialog Section */}
                <section className="p-6 border border-zinc-800 rounded-xl bg-zinc-900/50">
                    <h2 className="text-xl font-semibold mb-4">Dialog (Modal)</h2>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Open Modal</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Animated Dialog</DialogTitle>
                            </DialogHeader>
                            <div className="py-4 text-zinc-400">
                                This modal uses the 'pop' animation preset by default.
                            </div>
                            <Button onClick={() => alert('Action!')}>Confirm</Button>
                        </DialogContent>
                    </Dialog>
                </section>

                {/* Dropdown Section */}
                <section className="p-6 border border-zinc-800 rounded-xl bg-zinc-900/50">
                    <h2 className="text-xl font-semibold mb-4">Dropdown</h2>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost">Open Menu</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </section>

                {/* Checkbox & Switch Section */}
                <section className="p-6 border border-zinc-800 rounded-xl bg-zinc-900/50">
                    <h2 className="text-xl font-semibold mb-4">Form Controls</h2>
                    <div className="space-y-6">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms" />
                            <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Accept terms and conditions
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch id="airplane-mode" />
                            <label htmlFor="airplane-mode" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Airplane Mode
                            </label>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
