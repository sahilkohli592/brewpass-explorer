import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Edit, Coffee, Cookie, Sandwich } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'drinks' | 'food' | 'desserts';
  available: boolean;
  image?: string;
}

const MenuManager = () => {
  const { toast } = useToast();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: '1',
      name: 'Cappuccino',
      description: 'Rich espresso with steamed milk foam',
      price: 120,
      category: 'drinks',
      available: true,
    },
    {
      id: '2',
      name: 'Chocolate Croissant',
      description: 'Buttery pastry with dark chocolate',
      price: 80,
      category: 'food',
      available: true,
    },
  ]);

  const [newItem, setNewItem] = useState<Omit<MenuItem, 'id'>>({
    name: '',
    description: '',
    price: 0,
    category: 'drinks',
    available: true,
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddItem = () => {
    if (!newItem.name || !newItem.description || newItem.price <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please fill all fields with valid data.",
        variant: "destructive",
      });
      return;
    }

    const item: MenuItem = {
      ...newItem,
      id: Date.now().toString(),
    };

    setMenuItems([...menuItems, item]);
    setNewItem({
      name: '',
      description: '',
      price: 0,
      category: 'drinks',
      available: true,
    });

    toast({
      title: "Menu Item Added",
      description: `${item.name} has been added to the menu.`,
    });
  };

  const handleDeleteItem = (id: string) => {
    const item = menuItems.find(item => item.id === id);
    setMenuItems(menuItems.filter(item => item.id !== id));
    
    toast({
      title: "Menu Item Deleted",
      description: `${item?.name} has been removed from the menu.`,
    });
  };

  const toggleAvailability = (id: string) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'drinks': return <Coffee className="h-4 w-4" />;
      case 'food': return <Sandwich className="h-4 w-4" />;
      case 'desserts': return <Cookie className="h-4 w-4" />;
      default: return <Coffee className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coffee className="h-5 w-5" />
            Menu Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add New Item Form */}
          <div className="border-2 border-dashed border-muted rounded-lg p-4">
            <h3 className="font-semibold mb-4">Add New Menu Item</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="itemName">Item Name</Label>
                <Input
                  id="itemName"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  placeholder="e.g., Cappuccino"
                />
              </div>
              <div>
                <Label htmlFor="itemPrice">Price (₹)</Label>
                <Input
                  id="itemPrice"
                  type="number"
                  value={newItem.price || ''}
                  onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                  placeholder="120"
                />
              </div>
              <div>
                <Label htmlFor="itemCategory">Category</Label>
                <select
                  id="itemCategory"
                  className="w-full p-2 border rounded-md"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value as any })}
                >
                  <option value="drinks">Drinks</option>
                  <option value="food">Food</option>
                  <option value="desserts">Desserts</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="itemDescription">Description</Label>
                <Textarea
                  id="itemDescription"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  placeholder="Brief description of the item"
                />
              </div>
            </div>
            <Button onClick={handleAddItem} className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>

          {/* Menu Items List */}
          <div>
            <h3 className="font-semibold mb-4">Current Menu ({menuItems.length} items)</h3>
            {menuItems.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No menu items added yet.</p>
            ) : (
              <div className="grid gap-4">
                {menuItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(item.category)}
                        <Badge variant="secondary" className="capitalize">
                          {item.category}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                        <p className="text-sm font-medium">₹{item.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={item.available ? "default" : "secondary"}
                        size="sm"
                        onClick={() => toggleAvailability(item.id)}
                      >
                        {item.available ? 'Available' : 'Unavailable'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingId(item.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MenuManager;