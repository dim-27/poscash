import { getAPI } from "@/repositories/api";
import { useQuery } from "@tanstack/react-query";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { Overview } from "@/components/dashboard/Chart";

const FormSchema = z.object({
  start: z.date({
    required_error: "A date of birth is required.",
  }),
  end: z.date({
    required_error: "A date of birth is required.",
  }),
});

const Report = () => {
  const [query, setQuery] = useState("?");
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const onSubmit = async (data) => {
    setStart(data.start);
    setEnd(data.end);
    setQuery(`?start=${data.start.toLocaleDateString("en-US")}&end=${data.end.toLocaleDateString("en-US")}`);
    await refetch();
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  const {
    data: report,
    isFetched,
    refetch,
  } = useQuery(
    ["report"],
    async () => {
      const res = await getAPI(`order/item${query}`);
      return res.data;
    },
    { enabled: false }
  );

  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  const endDate = new Date(end);
  let loop = new Date(start);
  let data = [];
  while (loop < endDate) {
    const newDate = loop.setDate(loop.getDate() + 1);
    loop = new Date(newDate);
    const revenue =
      isFetched &&
      report.rows.length > 0 &&
      report.rows
        .map((item) => {
          if (new Date(item.date).toLocaleDateString("en-US") === loop.toLocaleDateString("en-US")) {
            const total = item.qty * item.price;
            return total;
          } else {
            return 0;
          }
        })
        .reduce((a, b) => a + b);
    data.push({ date: loop.toLocaleDateString("en-US"), revenue: revenue });
  }

  return (
    <div>
      <div className="">
        <Form {...form} className="flex">
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-end justify-around">
            <div>
              <FormField
                control={form.control}
                name="start"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <FormMessage />
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="end"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <FormMessage />
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
      <div>
        <Overview data={data} />
      </div>
    </div>
  );
};

export default Report;
