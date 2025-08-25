"use client";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { supabase } from "@/supabaseClient";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  comment: z.string().min(1, "Comment is required"),
  rate: z.number().int().min(1).max(5),
});

type FormValues = z.infer<typeof schema>;

export function AddTestimonialDialog({ onSuccess }: { onSuccess?: () => void }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", role: "", comment: "", rate: 3 },
  });

  const rate = watch("rate");

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    const { error } = await supabase
      .from("testimonials")
      .insert({
        name: values.name,
        role: values.role,
        comment: values.comment,
        rate: values.rate,
      });
    setSubmitting(false);

    if (error) {
      toast({ title: "Failed to add testimonial", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "Submitted", description: "Your testimonial was submitted successfully." });
    reset({ name: "", role: "", comment: "", rate: 3 });
    setOpen(false);
    onSuccess?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add Testimonial</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a Testimonial</DialogTitle>
        </DialogHeader>
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Your name" {...register("name")} />
            {errors.name && <span className="text-sm text-red-600">{errors.name.message}</span>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <Input id="role" placeholder="e.g., Product Manager" {...register("role")} />
            {errors.role && <span className="text-sm text-red-600">{errors.role.message}</span>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="comment">Comment</Label>
            <Textarea id="comment" placeholder="Share your experience" {...register("comment")} />
            {errors.comment && <span className="text-sm text-red-600">{errors.comment.message}</span>}
          </div>
          <div className="grid gap-2">
            <Label>Rating</Label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-label={`Rate ${value} star${value > 1 ? "s" : ""}`}
                  onClick={() => setValue("rate", value, { shouldValidate: true })}
                  className="p-1"
                >
                  <Star className={value <= rate ? "h-6 w-6 fill-yellow-400 text-yellow-400" : "h-6 w-6 text-muted-foreground"} />
                </button>
              ))}
            </div>
            {errors.rate && <span className="text-sm text-red-600">{errors.rate.message}</span>}
          </div>
          <div className="flex justify-end gap-2">
            <Button type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}



