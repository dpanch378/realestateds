import { useState, useEffect } from "react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectItem, SelectContent, SelectTrigger } from "@/components/ui/select";

const RealEstateDashboard = () => {
    const [data, setData] = useState([]);
    const [region, setRegion] = useState("All");
    const [propertyType, setPropertyType] = useState("All");

    useEffect(() => {
        fetch("https://api.example.com/uk-real-estate-prices")
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    const filteredData = data.filter(item => 
        (region === "All" || item.region === region) && 
        (propertyType === "All" || item.propertyType === propertyType)
    );

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-4 mb-4">
                <Select value={region} onValueChange={setRegion}>
                    <SelectTrigger>Choose Region</SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All Regions</SelectItem>
                        <SelectItem value="London">London</SelectItem>
                        <SelectItem value="Manchester">Manchester</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger>Choose Property Type</SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All Types</SelectItem>
                        <SelectItem value="Flat">Flat</SelectItem>
                        <SelectItem value="House">House</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            
            <Card>
                <CardContent>
                    <h2 className="text-xl font-bold mb-2">Price Trends</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={filteredData}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="price" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            
            <Card>
                <CardContent>
                    <h2 className="text-xl font-bold mb-2">Regional Comparison</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={filteredData}>
                            <XAxis dataKey="region" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="price" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            
            <Card>
                <CardContent>
                    <h2 className="text-xl font-bold mb-2">Property Type Distribution</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={filteredData} dataKey="count" nameKey="propertyType" fill="#ffc658" label />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
};

export default RealEstateDashboard;
