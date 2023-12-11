// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import "../../testing/jest/matchers/index";
import { EntityMetadata } from "./types/EntityMetadata";
import { OneToMany } from "./OneToMany";
import { JoinColumn } from "./JoinColumn";
import { ManyToOne } from "./ManyToOne";
import { createEntityRelationOneToMany, EntityRelationOneToMany } from "./types/EntityRelationOneToMany";
import { Table } from "./Table";
import { Entity } from "./Entity";
import { Id } from "./Id";
import { Column } from "./Column";

describe('OneToMany', () => {

    @Table('carts')
    class CartEntity extends Entity {

        constructor () {
            super();
        }

        @Id()
        @Column('cart_id')
        public cartId ?: string;

        @OneToMany("cart_items", "cart")
        public cartItems ?: readonly CartItemEntity[];

    }

    @Table('cart_items')
    class CartItemEntity extends Entity {

        constructor () {
            super();
        }

        @Id()
        @Column('cart_item_id')
        public cartItemId ?: string;

        @ManyToOne(CartEntity)
        @JoinColumn('cart_id', false)
        public cart ?: CartEntity;

    }

    let entity : CartEntity;
    let metadata : EntityMetadata;

    beforeEach(() => {
        entity = new CartEntity();
        metadata = entity.getMetadata();
    });

    it('can set fields metadata for cart property', () => {
        const expectedItem : EntityRelationOneToMany = createEntityRelationOneToMany("cartItems", "cart", "cart_items");
        // .toBeArray() is only available in the testing mode
        // @ts-ignore
        expect(metadata.oneToManyRelations).toBeArray();
        expect(metadata.oneToManyRelations).toContainEqual(expectedItem);
    });

});
