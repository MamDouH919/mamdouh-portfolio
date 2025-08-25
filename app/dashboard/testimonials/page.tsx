"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Testimonial = {
  id: number
  name: string
  role: string
  comment: string
  rate: number
  status?: string
};

export default function TestimonialsAdminPage() {
  const { toast } = useToast();
  const [rows, setRows] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mutatingId, setMutatingId] = useState<number | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.from("testimonials").select("*").order("id", { ascending: false });
    if (error) {
      setError(error.message);
      setRows([]);
    } else {
      setRows(data as Testimonial[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id: number, status: "approved" | "rejected") => {
    setMutatingId(id);
    const { error } = await supabase.from("testimonials").update({ status }).eq("id", id);
    setMutatingId(null);
    if (error) {
      toast({ title: "Failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Updated", description: `Marked as ${status}.` });
    load();
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Testimonials</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {rows.map((t) => (
            <Card key={t.id}>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{t.name}</div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">{t.status ?? "pending"}</div>
                </div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
                <p className="text-sm">{t.comment}</p>
                <div className="flex items-center gap-2 pt-2">
                  {t.status !== "approved" && (
                    <Button size="sm" disabled={mutatingId === t.id} onClick={() => updateStatus(t.id, "approved")}>Approve</Button>
                  )}
                  {t.status !== "rejected" && (
                    <Button size="sm" variant="secondary" disabled={mutatingId === t.id} onClick={() => updateStatus(t.id, "rejected")}>Reject</Button>
                  )}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="destructive" disabled={mutatingId === t.id}>Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogTitle>Delete testimonial</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the testimonial from the database.
                      </AlertDialogDescription>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={async () => {
                            setMutatingId(t.id);
                            const { data, error } = await supabase.from("testimonials").delete().eq("id", t.id);
                            console.log(data);
                            
                            setMutatingId(null);
                            if (error) {
                              toast({ title: "Failed", description: error.message, variant: "destructive" });
                              return;
                            }
                            toast({ title: "Deleted", description: "The testimonial has been removed." });
                            load();
                          }}
                        >
                          Confirm
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}


