// sanity/schemas/demo-importer/DemoImporter.tsx
'use client'

import React, { useState } from 'react'
import { Card, Button, Text, Box, Flex, Spinner } from '@sanity/ui'
import { importDemoData } from '@/app/actions'
import { useToast } from "@/hooks/use-toast"


export default function DemoImporter() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const { toast } = useToast();

  const handleImport = async () => {
    setIsLoading(true)
    setMessage('আমদানি করা হচ্ছে... অনুগ্রহ করে অপেক্ষা করুন।')
    
    try {
      const result = await importDemoData()
      if (result.success) {
        toast({
            title: "সফল",
            description: result.message,
        });
        setMessage(result.message || 'ডেমো কনটেন্ট সফলভাবে যোগ করা হয়েছে।')
      } else {
         toast({
            title: "ত্রুটি",
            description: result.message,
            variant: "destructive",
        });
        setMessage(`ত্রুটি: ${result.message}`)
      }
    } catch (error) {
       let errorMessage = 'ডেমো কনটেন্ট যোগ করতে সমস্যা হয়েছে।';
       if (error instanceof Error) {
           errorMessage = error.message;
       }
       toast({
            title: "ত্রুটি",
            description: errorMessage,
            variant: "destructive",
       });
       setMessage(`একটি অপ্রত্যাশিত ত্রুটি ঘটেছে: ${errorMessage}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card padding={4} >
      <Box padding={[3, 3, 4, 5]}>
        <Card>
            <Text as="h1" size={4} weight="bold">ডেমো কনটেন্ট যোগ করুন</Text>
            <Box marginTop={4}>
                <Text>
                ওয়েবসাইটের কন্টেন্ট পরীক্ষার জন্য এখানে ক্লিক করে Sanity-তে কিছু ডেমো কনটেন্ট যোগ করুন। এটি শিক্ষক, কর্মচারী, বিভিন্ন পৃষ্ঠা এবং অন্যান্য তথ্যের জন্য নমুনা ডেটা আমদানি করবে।
                </Text>
            </Box>
            <Box marginTop={5}>
                <Flex align="center" gap={3}>
                    <Button
                    fontSize={[2, 2, 3]}
                    padding={[3, 3, 4]}
                    text="Import Demo Content"
                    tone="primary"
                    onClick={handleImport}
                    disabled={isLoading}
                    />
                    {isLoading && <Spinner />}
                </Flex>

            </Box>
             {message && (
                <Box marginTop={4}>
                    <Text>{message}</Text>
                </Box>
            )}
        </Card>
      </Box>
    </Card>
  )
}
