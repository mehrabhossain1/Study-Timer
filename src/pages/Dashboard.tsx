import { Link } from "react-router-dom";
import { Package, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Layout from "@/components/Layout";

export default function Dashboard() {
  return (
    <Layout>
      <section className="container py-12">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome to your Cement Shop Inventory Management System.
        </p>

        <div className="grid gap-6 pt-8 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">Inventory Summary</CardTitle>
              <CardDescription>Current cement bags in stock</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">750</div>
              <p className="text-sm text-muted-foreground">
                Total bags in inventory
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/inventory" className="w-full">
                <Button className="w-full" variant="outline">
                  <Package className="mr-2 h-4 w-4" />
                  Manage Inventory
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">Sales Summary</CardTitle>
              <CardDescription>Recent sales activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">250</div>
              <p className="text-sm text-muted-foreground">
                Bags sold this month
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/sales" className="w-full">
                <Button className="w-full" variant="outline">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  View Sales
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">Revenue</CardTitle>
              <CardDescription>Current month revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">₹125,000</div>
              <p className="text-sm text-muted-foreground">
                From 250 bags sold
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/sales" className="w-full">
                <Button className="w-full" variant="outline">
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Link to="/inventory">
            <Button size="lg" className="w-full">
              Manage Inventory
            </Button>
          </Link>
          <Link to="/sales">
            <Button size="lg" className="w-full">
              Record Sales
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
