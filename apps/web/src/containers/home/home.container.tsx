"use client";

import Link from "next/link";
import { Activity, BookOpen, Code2, Database, Github, Layers, Rocket, Server, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useHealthCheck } from "@/features/common/hooks";

function HomeContainer() {
	const { data: healthData, isLoading, error } = useHealthCheck();

	return (
		<div className="flex min-h-screen flex-col">
			{/* Hero Section */}
			<section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden border-b bg-gradient-to-br from-background via-background to-muted/30 px-4 py-20">
				<div className="mx-auto w-full max-w-6xl">
					<div className="text-center">
						<Badge
							className="mb-6 bg-primary/10 font-medium text-primary hover:bg-primary/20"
							variant="secondary"
						>
							<Rocket className="mr-2 size-3" />
							Note Mono
						</Badge>

						<h1 className="mb-6 font-bold text-5xl tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
							Modern
							<span className="block bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
								Note Taking
							</span>
							Platform
						</h1>

						<p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
							A powerful, type-safe application built with Next.js and Elysia. Create,
							organize, and collaborate on your notes with beautiful boards and seamless
							real-time sync.
						</p>

						<div className="flex flex-wrap items-center justify-center gap-4">
							<Button asChild size="lg">
								<Link href="/login">Get Started</Link>
							</Button>
							<Button asChild size="lg" variant="outline">
								<Link href="/board">Explore Boards</Link>
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="border-b bg-background py-16">
				<div className="mx-auto w-full max-w-6xl px-4">
					<div className="mb-12 text-center">
						<h2 className="mb-4 font-bold text-3xl tracking-tight sm:text-4xl">
							Built for Developers
						</h2>
						<p className="mx-auto max-w-2xl text-muted-foreground text-lg">
							Leveraging the best tools and practices for a modern development
							experience
						</p>
					</div>

					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
						<FeatureCard
							description="Next.js 15 with App Router for lightning-fast performance"
							icon={Code2}
							title="Next.js 15"
						/>
						<FeatureCard
							description="High-performance backend with type-safe Elysia.js"
							icon={Server}
							title="Elysia"
						/>
						<FeatureCard
							description="End-to-end type safety with TypeScript"
							icon={Zap}
							title="TypeScript"
						/>
						<FeatureCard
							description="Optimized monorepo with Turborepo"
							icon={Layers}
							title="Turborepo"
						/>
					</div>
				</div>
			</section>

			{/* System Status Section */}
			<section className="border-b bg-muted/30 py-16">
				<div className="mx-auto w-full max-w-4xl px-4">
					<Card className="border-2">
						<CardHeader>
							<div className="flex items-center justify-between">
								<div>
									<CardTitle className="flex items-center gap-2">
										<Activity className="size-5" />
										System Status
									</CardTitle>
									<CardDescription className="mt-1">
										Real-time monitoring of your application health
									</CardDescription>
								</div>
								<StatusBadge error={error} healthData={healthData} isLoading={isLoading} />
							</div>
						</CardHeader>
						<Separator />
						<CardContent className="pt-6">
							{isLoading && (
								<div className="space-y-4">
									<Skeleton className="h-20 w-full" />
									<div className="grid gap-4 sm:grid-cols-2">
										<Skeleton className="h-16" />
										<Skeleton className="h-16" />
										<Skeleton className="h-16" />
										<Skeleton className="h-16" />
									</div>
								</div>
							)}

							{error && (
								<div className="space-y-4 rounded-lg border border-destructive/20 bg-destructive/5 p-6">
									<div className="flex items-center gap-2">
										<Activity className="size-5 text-destructive" />
										<h3 className="font-semibold text-destructive">System Unavailable</h3>
									</div>
									<p className="text-muted-foreground text-sm">
										Unable to connect to the server. Make sure the backend is running on port
										3001.
									</p>
								</div>
							)}

							{healthData?.data?.data && (
								<div className="space-y-6">
									<div className="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
										<div className="flex items-center gap-2">
											<div className="size-2 animate-pulse rounded-full bg-green-500" />
											<p className="font-semibold text-green-600 dark:text-green-400">
												All systems operational
											</p>
										</div>
									</div>

									<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
										<MetricCard
											icon={Activity}
											label="Uptime"
											value={`${Math.floor(healthData.data.data.uptime / 60)}m`}
										/>
										<MetricCard
											icon={Zap}
											label="Response"
											value={`${healthData.data.data.responseTime}ms`}
										/>
										<MetricCard
											icon={Database}
											label="Version"
											value={healthData.data.data.version}
										/>
										<MetricCard
											icon={Server}
											label="Status"
											value={healthData.data.data.status}
										/>
									</div>
								</div>
							)}
						</CardContent>
					</Card>
				</div>
			</section>

			{/* Footer Links */}
			<section className="bg-background py-12">
				<div className="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-center gap-4 px-4">
					<Button asChild variant="outline" size="sm">
						<a
							href="http://localhost:3001/health"
							rel="noopener noreferrer"
							target="_blank"
						>
							<Activity className="mr-2 size-4" />
							API Health
						</a>
					</Button>
					<Button asChild variant="outline" size="sm">
						<a
							href="http://localhost:3001/docs"
							rel="noopener noreferrer"
							target="_blank"
						>
							<BookOpen className="mr-2 size-4" />
							API Docs
						</a>
					</Button>
					<Button asChild variant="outline" size="sm">
						<a href="https://github.com" rel="noopener noreferrer" target="_blank">
							<Github className="mr-2 size-4" />
							GitHub
						</a>
					</Button>
				</div>
			</section>
		</div>
	);
}

interface FeatureCardProps {
	description: string;
	icon: React.ComponentType<{ className?: string }>;
	title: string;
}

function FeatureCard({ description, icon: Icon, title }: FeatureCardProps) {
	return (
		<Card className="group transition-all hover:shadow-lg hover:shadow-primary/5">
			<CardHeader>
				<div className="mb-2 flex size-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
					<Icon className="size-6 text-primary" />
				</div>
				<CardTitle className="font-semibold text-lg">{title}</CardTitle>
				<CardDescription className="text-sm">{description}</CardDescription>
			</CardHeader>
		</Card>
	);
}

interface StatusBadgeProps {
	error: unknown;
	healthData: unknown;
	isLoading: boolean;
}

function StatusBadge({ error, healthData, isLoading }: StatusBadgeProps) {
	if (isLoading) {
		return (
			<Badge className="bg-blue-500/10 font-medium text-blue-600 dark:text-blue-400" variant="secondary">
				<div className="mr-2 size-2 animate-pulse rounded-full bg-blue-500" />
				Checking...
			</Badge>
		);
	}

	if (error) {
		return (
			<Badge className="bg-destructive/10 font-medium text-destructive" variant="secondary">
				<div className="mr-2 size-2 rounded-full bg-destructive" />
				Offline
			</Badge>
		);
	}

	if (healthData) {
		return (
			<Badge
				className="bg-green-500/10 font-medium text-green-600 dark:text-green-400"
				variant="secondary"
			>
				<div className="mr-2 size-2 animate-pulse rounded-full bg-green-500" />
				Online
			</Badge>
		);
	}

	return null;
}

interface MetricCardProps {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	value: string;
}

function MetricCard({ icon: Icon, label, value }: MetricCardProps) {
	return (
		<Card className="border">
			<CardContent className="flex flex-col gap-2 p-4">
				<div className="flex items-center gap-2">
					<Icon className="size-4 text-muted-foreground" />
					<p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
						{label}
					</p>
				</div>
				<p className="font-bold text-2xl">{value}</p>
			</CardContent>
		</Card>
	);
}

export default HomeContainer;
