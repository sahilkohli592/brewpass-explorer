
import React, { useState } from 'react';
import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from '@/hooks/use-toast';

const FraudReporting = () => {
  const [reportData, setReportData] = useState({
    passId: '',
    issueType: 'duplicate',
    description: '',
  });

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reportData.passId || !reportData.description) {
      toast({
        title: "Missing Information",
        description: "Please provide all required information to submit your report.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would submit to an API
    toast({
      title: "Report Submitted",
      description: "Your report has been submitted and will be reviewed by our team.",
    });
    
    // Reset form
    setReportData({
      passId: '',
      issueType: 'duplicate',
      description: '',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ShieldAlert className="mr-2 h-5 w-5 text-destructive" />
          Report Fraud or Misuse
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmitReport} className="space-y-4">
          <div>
            <Label htmlFor="pass-id">Pass ID</Label>
            <Input 
              id="pass-id" 
              placeholder="Enter the customer's pass ID (e.g., BP123456789)"
              value={reportData.passId}
              onChange={(e) => setReportData({ ...reportData, passId: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label>Issue Type</Label>
            <RadioGroup 
              value={reportData.issueType} 
              onValueChange={(value) => setReportData({ ...reportData, issueType: value })}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="duplicate" id="duplicate" />
                <Label htmlFor="duplicate" className="cursor-pointer">Duplicated/Fake Pass</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="multiple" id="multiple" />
                <Label htmlFor="multiple" className="cursor-pointer">Multiple Redemptions</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other" className="cursor-pointer">Other Issue</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Please describe the issue in detail..."
              value={reportData.description}
              onChange={(e) => setReportData({ ...reportData, description: e.target.value })}
              className="resize-none min-h-[100px]"
              required
            />
          </div>
          
          <Button type="submit" className="w-full">Submit Report</Button>
          
          <p className="text-xs text-muted-foreground text-center">
            Our team will review your report and take appropriate action within 24-48 hours.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default FraudReporting;
