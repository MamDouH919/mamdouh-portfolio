"use client"
import React from 'react'
import CircularGallery from '../circular-gallery'

const CircularGallerySection = () => {
    return (
        <div style={{ height: '600px', position: 'relative' }}>
            <CircularGallery bend={3} textColor="#006d3a" borderRadius={0.05} scrollEase={0.02} />
        </div>
    )
}

export default CircularGallerySection